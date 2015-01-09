using Scrummer.Domain.ProjectAgg;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Infrastructure.Mongo
{
    public class MissionRepository : MongoRepository<Mission>, IMissionRepository
    {
        public MissionRepository(IMongoUnitOfWork uow)
            : base(uow)
        {

        }
    }
}
