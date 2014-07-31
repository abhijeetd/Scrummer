using Scrummer.Domain.Accounts;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
