﻿using System.Net.Http;
using System.Web;
using System.Web.Http;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.BlobStorage;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/blob")]
    public class BlobStorageController : BaseController
    {
        private readonly IBlobStorageService<ServiceResult> _service;

        public BlobStorageController()
        {
            _service = IoC.Get<IBlobStorageService<ServiceResult>>();
        }

        [HttpPost, Route("create_container")]   // TODO: use create-container
        public IHttpActionResult CreateContainer([FromBody] CreateContainerViewModel viewModel)
        {
            return HandleResult(_service.CreateContainer(viewModel));
        }

        [HttpPost, Route("upload")]
        public IHttpActionResult Upload([FromBody] UploadBlobViewModel viewModel, MultipartFileData file)
        {
            var httpRequest = HttpContext.Current.Request;
            viewModel.FileSource = httpRequest.Files[0];
            return HandleResult(_service.Upload(viewModel));
        }

        [HttpPost, Route("list")]
        public IHttpActionResult List(ListBlobsViewModel viewModel)
        {
            return HandleResult(_service.List(viewModel));
        }

        [HttpPost, Route("download")]
        public IHttpActionResult Download(DownloadBlobViewModel viewModel)
        {
            return HandleResult(_service.Download(viewModel));
        }

        [HttpPost, Route("delete")]
        public IHttpActionResult Download(DeleteBlobViewModel viewModel)
        {
            return HandleResult(_service.Delete(viewModel));
        }

    }
}