using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Seedwork
{
    public interface IUnitOfWork: IDisposable
    {
        void Commit();
    }
}
