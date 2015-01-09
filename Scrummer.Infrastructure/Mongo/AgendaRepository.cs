using MongoDB.Driver;
using Scrummer.Domain.Seedwork;
using Scrummer.Domain.StandupAgg;
using Scrummer.Infrastructure.Mongo.Seedwork;

namespace Scrummer.Infrastructure.Mongo
{
    public class AgendaRepository : MongoRepository<Agenda>, IAgendaRepository
    {
        public AgendaRepository(IMongoUnitOfWork uow)
            : base(uow)
        {

        }
    }
}
