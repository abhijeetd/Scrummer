using Scrummer.Domain.Seedwork;
using System;

namespace Scrummer.Domain.StandupAgg
{
    public class Agenda: Entity
    {
        //public object _id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public bool IsDiscussed { get; set; }
    }
}
