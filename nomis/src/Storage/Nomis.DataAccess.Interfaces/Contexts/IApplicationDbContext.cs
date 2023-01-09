// ------------------------------------------------------------------------------------------------------
// <copyright file="IApplicationDbContext.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

namespace Nomis.DataAccess.Interfaces.Contexts
{
    /// <summary>
    /// Application data access database context.
    /// </summary>
    public interface IApplicationDbContext :
        ILoggableDbContext
    {
    }
}