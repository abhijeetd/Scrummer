using MongoDB.Driver;
using Scrummer.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Infrastructure.Mongo.Seedwork
{
    public interface IMongoUnitOfWork: IUnitOfWork
    {
        MongoCollection<TEntity> CreateSet<TEntity>() where TEntity : class;
    }
}
