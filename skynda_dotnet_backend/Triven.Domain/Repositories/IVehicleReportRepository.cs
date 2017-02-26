﻿using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReportRepository<TVehicleReport> : IBaseCrudRepository<TVehicleReport>
        where TVehicleReport : IVehicleReport
    {
        IList<TVehicleReport> GetAllBy(int vehicleId);
    }
}