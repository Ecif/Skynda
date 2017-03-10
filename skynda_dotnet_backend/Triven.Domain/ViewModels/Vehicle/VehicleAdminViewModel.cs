﻿using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Feature;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleAdminViewModel : BaseViewModel, ImageStorable<ImageViewModel>
    {
        public string VinCode { get; set; }
        public decimal Price { get; set; }
        public string RegistrationNumber { get; set; }
        public decimal Mileage { get; set; }
        public string ColorOutsideHex { get; set; }
        public string ColorInsideHex { get; set; }
        public decimal FuelCity { get; set; }
        public decimal FuelHighway { get; set; }
        public int CompressionRatio { get; set; }
        public string CompressionType { get; set; }
        public string Configuration { get; set; }
        public string Cylinders { get; set; }
        public string Displacement { get; set; }
        public int Size { get; set; }
        public int Torque { get; set; }
        public int TotalValves { get; set; }
        public string SafetyUrl { get; set; }
        public int SafetyStars { get; set; }
        public string Additional { get; set; }
        public ImageViewModel MainImage { get; set; }
        public VehicleModelViewModel VehicleModel { get; set; }
        public List<FeatureAdminSelectViewModel> FeaturesAdminSelect { get; set; } = new List<FeatureAdminSelectViewModel>();
        public List<VehicleFeatureViewModel> Features { get; set; } = new List<VehicleFeatureViewModel>();
        public List<FaultBaseViewModel> Faults { get; set; } = new List<FaultBaseViewModel>();
        public List<ImageViewModel> Images { get; set; } = new List<ImageViewModel>();
        public List<VehicleDescriptionViewModel> Descriptions { get; set; } = new List<VehicleDescriptionViewModel>();
        public ImageViewModel GetImage { get; set; }
    }
}