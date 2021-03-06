﻿using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("VehicleFault")]
    public class VehicleFault : AuditableModel, IVehicleFault
    {
        public string Text { get; set; }

        public int? ImageId { get; set; }        
        public Image Image { get; set; }        

        public int VehicleReportId { get; set; }
        public virtual VehicleReport VehicleReport { get; set; }
    }
}