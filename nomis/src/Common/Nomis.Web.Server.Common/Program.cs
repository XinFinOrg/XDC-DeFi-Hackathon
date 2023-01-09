// ------------------------------------------------------------------------------------------------------
// <copyright file="Program.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using System.Reflection;

using Microsoft.AspNetCore.Mvc;
using Nomis.Api.Common.Extensions;
using Nomis.Api.Common.Middlewares;
using Nomis.Api.Common.Swagger.Filters;
using Nomis.Api.Xdc.Extensions;
using Nomis.CacheProviderService.Extensions;
using Nomis.Coingecko.Extensions;
using Nomis.CurrentUserService.Extensions;
using Nomis.DataAccess.PostgreSql.Extensions;
using Nomis.DataAccess.PostgreSql.Scoring.Extensions;
using Nomis.ScoringService.Extensions;
using Nomis.Web.Server.Common.Extensions;
using Nomis.Xdcscan;
using Serilog;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Unchase.Swashbuckle.AspNetCore.Extensions.Extensions;
using Unchase.Swashbuckle.AspNetCore.Extensions.Filters;
using Unchase.Swashbuckle.AspNetCore.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFiles()
    .AddEnvironmentVariables();

builder.Services
    .AddHttpContextAccessor()
    .AddCache(builder.Configuration)
    .AddCurrentUserService()
    .AddApplicationPersistence(builder.Configuration)
    .AddScoringPersistence(builder.Configuration)
    .AddUSDConverter()
    .AddScoringService();

var scoringOptions = builder.ConfigureScoringOptions()
    .WithXDCBlockchain<Xdcscan>()
    .Build();

builder.Services
    .AddApiVersioning(config =>
    {
        config.DefaultApiVersion = new(1, 0);
        config.AssumeDefaultVersionWhenUnspecified = true;
        config.ReportApiVersions = true;
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.WithMethods("GET", "OPTIONS");
        policy.AllowAnyHeader();
    });
});

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressMapClientErrors = true;
    })
    .ConfigureApplicationPartManager(manager =>
    {
        manager.AddNomisControllers(scoringOptions);
    });

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddSingleton<ExceptionHandlingMiddleware>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    #region Add xml-commånts

    var xmlPathes = new List<string>();
    string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
    foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
    {
        if (!assembly.IsDynamic)
        {
            string xmlFile = $"{assembly.GetName().Name}.xml";
            string xmlPath = Path.Combine(baseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
                options.IncludeXmlCommentsWithRemarks(xmlPath);
                xmlPathes.Add(xmlPath);
            }
        }
    }

    options.UseAllOfToExtendReferenceSchemas();

    options.IncludeXmlCommentsFromInheritDocs(true);

    options.AddEnumsWithValuesFixFilters(o =>
    {
        o.ApplySchemaFilter = true;
        o.XEnumNamesAlias = "x-enum-varnames";
        o.XEnumDescriptionsAlias = "x-enum-descriptions";
        o.ApplyParameterFilter = true;
        o.ApplyDocumentFilter = true;
        o.IncludeDescriptions = true;
        o.IncludeXEnumRemarks = true;
        o.DescriptionSource = DescriptionSources.DescriptionAttributesThenXmlComments;
        o.NewLine = "\n";

        foreach (string xmlPath in xmlPathes)
        {
            o.IncludeXmlCommentsFrom(xmlPath);
        }
    });

    #endregion Add xml-commånts

    options.SwaggerDoc("v1", new()
    {
        Version = "v1",
        Title = "Nomis Score API",
        Description = "An API to get Nomis Score for crypto wallets.",
    });

    #region Add Versioning

    options.OperationFilter<RemoveVersionFromParameterFilter>();
    options.DocumentFilter<ReplaceVersionWithExactValueInPathFilter>();
    options.DocInclusionPredicate((version, desc) =>
    {
        if (!desc.TryGetMethodInfo(out var methodInfo))
        {
            return false;
        }

        var versions = methodInfo
            .DeclaringType?
            .GetCustomAttributes(true)
            .OfType<ApiVersionAttribute>()
            .SelectMany(attr => attr.Versions);

        var maps = methodInfo
            .GetCustomAttributes(true)
            .OfType<MapToApiVersionAttribute>()
            .SelectMany(attr => attr.Versions)
            .ToList();

        return versions?.Any(v => $"v{v}" == version) == true
               && (maps.Count == 0 || maps.Any(v => $"v{v}" == version));
    });

    #endregion Add Versioning

    options.EnableAnnotations();
    options.ExampleFilters();

    options.DocumentFilter<AppendActionCountToTagSummaryDocumentFilter>("(the count of actions: {0})");

    options.AddNomisFilters(scoringOptions);

    options.OrderActionsBy(apiDesc => $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.RelativePath}");
    options.DocumentFilter<TagOrderByNameDocumentFilter>();
});
builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetExecutingAssembly());

builder.Services.AddHealthChecks(); // TODO - add custom healthchecks

builder.Host.UseSerilog((context, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

var app = builder.Build();

app.UseSerilogRequestLogging(options =>
{
    options.EnrichDiagnosticContext = SerilogExtensions.HttpRequestEnricher;
});

app.MapHealthChecks("/health");

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseStaticFiles();

app.UseRouting();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("v1/swagger.json", "Nomis Score API V1");
    options.DocumentTitle = "Nomis Score API V1";
    options.DefaultModelsExpandDepth(0);

    options.InjectStylesheet("/css/swagger.css");
    options.DisplayRequestDuration();
    options.DocExpansion(DocExpansion.None);

    options.ConfigObject.DisplayOperationId = true;
    options.ConfigObject.ShowCommonExtensions = true;
    options.ConfigObject.ShowExtensions = true;
});

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

try
{
    app.Run();
}
catch (Exception e)
{
    Log.Fatal(e, "A fatal error has occurred!");
}
finally
{
    Log.Information("Server Shutting down...");
    Log.CloseAndFlush();
}