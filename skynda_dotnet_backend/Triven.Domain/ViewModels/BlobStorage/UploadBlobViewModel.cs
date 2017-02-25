﻿using System.IO;
using System.Web;

namespace Triven.Domain.ViewModels.BlobStorage
{
    public class UploadBlobModel
    {
        public string ContainerName { get; set; }
        public string BlobName { get; set; }
        public HttpPostedFileBase FileSource;
        public byte[] ByteArray;
    }
}