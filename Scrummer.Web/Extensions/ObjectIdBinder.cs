using MongoDB.Bson;
using System.Web.Mvc;

namespace Scrummer.Web.Extensions
{
    public class ObjectIdBinder : IModelBinder
    {
        public object BindModel(ControllerContext controller_context, ModelBindingContext binding_context)
        {
            ValueProviderResult result = binding_context.ValueProvider.GetValue(binding_context.ModelName);
            return new ObjectId(result.AttemptedValue);
        }
    }
}