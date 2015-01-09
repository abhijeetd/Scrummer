using Scrummer.Domain.StandupAgg;
using Scrummer.Infrastructure.Mongo.Seedwork;

namespace Scrummer.Infrastructure.Mongo
{
    public class ActionItemRepository : MongoRepository<ActionItem>, IActionItemRepository
    {
        public ActionItemRepository(IMongoUnitOfWork uow)
            : base(uow)
        {

        }
    }
}
