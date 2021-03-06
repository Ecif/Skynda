﻿using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IVehicleFaultRepository<TVehicleFaultEntity> : IBaseCrudRepository<TVehicleFaultEntity>
        where TVehicleFaultEntity : IVehicleFault
    {
        IList<TVehicleFaultEntity> GetCategoryFaults(int categoryId);
    }
}