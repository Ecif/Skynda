﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Data.EntityFramework.Models.Base;
using X3Project.Domain.Constants;
using X3Project.Domain.Extensions;
using X3Project.Domain.Models.Message;

namespace X3Project.Data.EntityFramework.Models.MessageTemplate
{
    [Table("MessageTemplate")]
    public class MessageTemplateModel : AuditableModel, IMessageModel
    {
        [Key, Column(Order = 0)]
        public override int Id { get; set; }

        [Key, Column(Order = 1)]
        public string Name { get; set; }

        public string Message { get; set; }
        public string Fields { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Locale", Order = 2)]
        [Key]
        public string LocaleString
        {
            get { return Locale.ToString(); }
            private set { Locale = value.ParseEnum<Language>(); }
        }

        [NotMapped]
        public Language Locale { get; set; }

        public string Title { get; set; }
    }
}