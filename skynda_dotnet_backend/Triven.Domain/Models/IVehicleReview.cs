﻿using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleReview : IAuditableBaseModel
    {
        //int LogoId { get; set; }
        //int VideoId { get; set; }
        string VideoUrl { get; set; }
        string LogoUrl { get; set; }
        int Rating { get; set; }
        string Text { get; set; }
    }
}