﻿using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("Feature")]
    public class Feature : AuditableModel, IFeature
    {
        public string Description { get; set; }
        public bool IsImported { get; set; }
        public int Weight { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public string NameEng { get; set; } // ajutine lahendus
        public bool IsActive { get; set; }
        public string CategoryName { get; set; } // ajutine lahendus
    }
}