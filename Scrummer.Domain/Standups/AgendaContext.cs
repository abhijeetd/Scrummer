using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Standups
{
    public class AgendaContext: SearchContext
    {
        public DateTime Date { get; set; }
    }
}
