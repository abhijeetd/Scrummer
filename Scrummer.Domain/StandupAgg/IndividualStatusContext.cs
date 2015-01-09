using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.StandupAgg
{
    public class IndividualStatusContext: SearchContext
    {
        public DateTime Date { get; set; }
        public string CurrentUser { get; set; }
        public string Project { get; set; }
    }
}
