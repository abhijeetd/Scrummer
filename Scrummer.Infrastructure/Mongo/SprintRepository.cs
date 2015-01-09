using Scrummer.Domain.ProjectAgg;
using Scrummer.Infrastructure.Mongo.Seedwork;

namespace Scrummer.Infrastructure.Mongo
{
    public class SprintRepository : MongoRepository<Sprint>, ISprintRepository
    {
        public SprintRepository(IMongoUnitOfWork uow)
            : base(uow)
        {

        }
    }
}
