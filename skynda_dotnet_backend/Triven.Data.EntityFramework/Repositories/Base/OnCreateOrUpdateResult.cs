﻿using System;
using Triven.Domain.Models.Base;

namespace Triven.Data.EntityFramework.Repositories.Base
{
    public class OnCreateOrUpdateResult<TModel> : RepositoryResult<TModel> where TModel : IBaseModel
    {
        public string ErrorMessage { get; private set; }

        public static class Factory
        {
            public static OnCreateOrUpdateResult<TModel> Success(TModel contextModel)
            {
                var result = new OnCreateOrUpdateResult<TModel>
                {
                    IsSuccess = true,
                    ContextObject = contextModel
                };

                return result;
            }

            public static OnCreateOrUpdateResult<TModel> Fail(Exception ex)
            {
                var result = new OnCreateOrUpdateResult<TModel>
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };

                return result;
            }
        }

    }
}