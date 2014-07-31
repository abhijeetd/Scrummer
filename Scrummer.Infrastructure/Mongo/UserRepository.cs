using Scrummer.Domain.Accounts;
using Scrummer.Infrastructure.Mongo.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Infrastructure.Mongo
{
    public class UserRepository : MongoRepository<User>, IUserRepository
    {
        public UserRepository(IMongoUnitOfWork uow) : base(uow) { }
    }
}
