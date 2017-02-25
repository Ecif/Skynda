﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Driver;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories.Driver
{
    public interface IDriverRepository : IBaseCrudRepository<IDriverModel>
    {
    }
}