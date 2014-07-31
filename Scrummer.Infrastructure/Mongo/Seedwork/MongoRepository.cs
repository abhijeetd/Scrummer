using MongoDB.Driver;
using System.Linq;
using MongoDB.Bson;
using FluentMongo.Linq;
using MongoDB.Driver.Builders;
using System;
using Scrummer.Domain.Seedwork;
using System.Collections.Generic;

namespace Scrummer.Infrastructure.Mongo.Seedwork
{
    public class MongoRepository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected IMongoUnitOfWork uow;

        public MongoRepository(IMongoUnitOfWork unitOfWork)
        {
            if (unitOfWork == null)
                throw new ArgumentNullException("unitOfWork");

            uow = unitOfWork;
        }

        public IUnitOfWork UnitOfWork
        {
            get { return uow; }
        }

        private MongoCollection<TEntity> GetSet()
        {
            return uow.CreateSet<TEntity>();
        }

        public void Add(TEntity item)
        {
            GetSet().Save(item);
        }

        //public void Remove(TEntity item)
        //{
        //    throw new NotImplementedException();
        //}

        public void Remove(string id)
        {
            GetSet().Remove(Query.EQ("_id", new ObjectId(id)));
        }

        public IEnumerable<TEntity> GetAll()
        {
            return GetSet().AsQueryable();
        }

        public IEnumerable<TEntity> GetFiltered(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter)
        {
            return GetSet().AsQueryable().Where(filter);
        }

        public void Modify(TEntity item)
        {
            GetSet().Save(item);
        }

        public TEntity Get(string id)
        {
            return GetSet().AsQueryable().Where(p => p._id == id).SingleOrDefault();
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
