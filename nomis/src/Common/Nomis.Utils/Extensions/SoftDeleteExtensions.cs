// ------------------------------------------------------------------------------------------------------
// <copyright file="SoftDeleteExtensions.cs" company="Nomis">
// Copyright (c) Nomis, 2022. All rights reserved.
// The Application under the MIT license. See LICENSE file in the solution root for full license information.
// </copyright>
// ------------------------------------------------------------------------------------------------------

using Nomis.Utils.Contracts.Deleting;

namespace Nomis.Utils.Extensions
{
    /// <summary>
    /// <see cref="ISoftDelete"/> extension methods.
    /// </summary>
    public static class SoftDeleteExtensions
    {
        /// <summary>
        /// Check if <see cref="ISoftDelete"/> entity is deleted.
        /// </summary>
        /// <param name="entity"><see cref="ISoftDelete"/>.</param>
        /// <returns>Returns true if <see cref="ISoftDelete"/> entity is removed. Otherwise - false.</returns>
        public static bool IsSoftDeleted(this ISoftDelete entity)
        {
            return entity.IsDeleted;
        }

        /// <summary>
        /// Delete <see cref="ISoftDelete"/> entity.
        /// </summary>
        /// <param name="entity"><see cref="ISoftDelete"/>.</param>
        /// <param name="userId">The identifier of the user who deleted the entity.</param>
        public static void SetBySoftDeleted(this ISoftDelete entity, Guid userId)
        {
            if (userId != Guid.Empty)
            {
                entity.DeletedBy = userId;
            }

            entity.DeletedOn = DateTime.UtcNow;
        }

        /// <summary>
        /// Restore deleted <see cref="ISoftDelete"/> entity.
        /// </summary>
        /// <param name="entity"><see cref="ISoftDelete"/>.</param>
        public static void SetBySoftUnDeleted(this ISoftDelete entity)
        {
            entity.DeletedBy = null;
            entity.DeletedOn = null;
        }
    }
}