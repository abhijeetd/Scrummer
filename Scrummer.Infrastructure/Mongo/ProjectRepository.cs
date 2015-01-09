using Scrummer.Domain.ProjectAgg;
using Scrummer.Infrastructure.Mongo.Seedwork;

namespace Scrummer.Infrastructure.Mongo
{
    public class ProjectRepository : MongoRepository<Project>, IProjectRepository
    {
        public ProjectRepository(IMongoUnitOfWork uow)
            : base(uow)
        {

        }
    }
}
