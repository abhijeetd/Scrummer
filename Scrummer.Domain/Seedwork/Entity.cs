using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Scrummer.Domain.Seedwork
{
    public class Entity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
    }
}
