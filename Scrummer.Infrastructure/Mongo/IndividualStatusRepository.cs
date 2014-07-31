using Scrummer.Domain.Standups;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Infrastructure.Mongo
{
    public class IndividualStatusRepository : MongoRepository<IndividualStatus>, IIndividualStatusRepository
    {
        public IndividualStatusRepository(IMongoUnitOfWork uow)
            : base(uow)
        { }
    }
}
