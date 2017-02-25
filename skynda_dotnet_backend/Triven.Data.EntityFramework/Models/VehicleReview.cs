﻿using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleReview: AuditableModel, IVehicleReview
    {
        public int LogoId { get; set; }
        public int VideoId { get; set; }
        public int Rating { get; set; }

        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }

        public string Text { get; set; }
    }
}