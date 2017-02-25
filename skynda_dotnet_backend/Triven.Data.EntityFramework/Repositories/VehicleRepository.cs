﻿using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<Vehicle>, IVehicleRepository<Vehicle>
    {
        public IList<Vehicle> Search(SearchRequestViewModel dto)
        {
            throw new System.NotImplementedException();
        }

        public Vehicle Get(int id, bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteEntity(Vehicle vehicleDescription, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public Vehicle SaveOrUpdate(Vehicle vehicle)
        {
            throw new System.NotImplementedException();
        }
    }
}