using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Scrummer.Web
{
    public class WebApiFormatterConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            json.SerializerSettings.Formatting = Formatting.None;
            json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            //TODO: remove this later
            config.Formatters.XmlFormatter.SupportedMediaTypes.Clear();
        }
    }
}