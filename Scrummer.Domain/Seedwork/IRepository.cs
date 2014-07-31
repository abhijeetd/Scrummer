using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Seedwork
{
    public interface IRepository<TEntity> : IDisposable
    {
        void Add(TEntity item);
        //void Remove(TEntity item);
        void Remove(string id);
        void Modify(TEntity item);
        TEntity Get(string id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetFiltered(Expression<Func<TEntity, bool>> filter);
    }
}
