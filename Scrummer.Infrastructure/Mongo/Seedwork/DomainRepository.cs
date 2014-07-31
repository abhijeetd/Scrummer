using Scrummer.Domain.Seedwork;

namespace Scrummer.Infrastructure.Mongo.Seedwork
{
    public class DomainRepository<TEntity> : MongoRepository<TEntity> where TEntity : Entity
    {
        public DomainRepository(IMongoUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        public ScrummerUnitOfWork DomainUnitOfWork
        {
            get { return UnitOfWork as ScrummerUnitOfWork; }
        }
    }
}
