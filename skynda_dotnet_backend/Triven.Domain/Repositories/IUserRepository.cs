﻿using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IUserRepository<TUserEntity> : IBaseCrudRepository<TUserEntity>
        where TUserEntity : IApplicationUser
    {
        TUserEntity GetByEmail(string email);

        TUserEntity GetByLogin(string login);
    }
}