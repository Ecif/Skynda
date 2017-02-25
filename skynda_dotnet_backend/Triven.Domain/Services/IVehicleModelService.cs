﻿using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Services
{
    public interface IVehicleModelService<out TResult> where TResult : IServiceResult
    {
        TResult GetAll();

        TResult Get(int id);

        TResult CreateOrUpdate(VehicleModelViewModel vehicleModelAdminDto);

        TResult Delete(int id);

        TResult Search(VehicleModelSearchRequestViewModel dto);
    }
}