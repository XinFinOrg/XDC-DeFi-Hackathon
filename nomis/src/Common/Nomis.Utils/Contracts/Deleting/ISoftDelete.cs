// ------------------------------------------------------------------------------------------------------
// <copyright file="ISoftDelete.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Properties;

namespace Nomis.Utils.Contracts.Deleting
{
    /// <summary>
    /// An interface indicating that the entity is "soft delete".
    /// </summary>
    /// <remarks>
    /// Such an entity will not actually be deleted, but will be marked as deleted.
    /// </remarks>
    public interface ISoftDelete :
        IHasDeletedOn
    {
        /// <summary>
        /// The ID of the user who deleted the entity.
        /// </summary>
        public Guid? DeletedBy { get; set; }
    }
}