using Scrummer.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Domain.Standups
{
    public class IndividualStatus: Entity
    {
        public DateTime Date { get; set; }
        public string AssignedTo { get; set; }
        public string Yesterday { get; set; }
        public string Today { get; set; }
        public string Impediments { get; set; }
        public string OutstandingTasks { get; set; }
        public bool HasOutstandingTasks { get; set; }
        public bool IsTfsUpdated { get; set; }
        public bool IsClicktimeUpdated { get; set; }
        public bool CanEdit { get; set; }
    }
}
