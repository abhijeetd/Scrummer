using Scrummer.Domain.StandupAgg;
using System;
using System.Linq;
using System.Collections.Generic;
using Scrummer.Domain.Accounts;

namespace Scrummer.Application
{
    public class StandupService
    {
        IAgendaRepository _agendaRepository;
        IActionItemRepository _actionItemRepository;
        IIndividualStatusRepository _individualStatusRepository;
        IUserRepository _userRepository;
        public StandupService(IAgendaRepository agendaRepository, IActionItemRepository actionItemRepository, IIndividualStatusRepository individualStatusRepository, IUserRepository userRepository)
        {
            _agendaRepository = agendaRepository;
            _actionItemRepository = actionItemRepository;
            _individualStatusRepository = individualStatusRepository;
            _userRepository = userRepository;
        }

        #region Agenda
        public Agenda AddAgenda(Agenda agenda)
        {
            _agendaRepository.Add(agenda);
            return agenda;
        }

        public IEnumerable<Agenda> GetAgendas(AgendaContext context)
        {
            return _agendaRepository.GetFiltered(p => p.Date > context.Date.Date && p.Date < context.Date.AddDays(1).Date);
        }

        public void MarkAgendaAsDiscussed(string aid)
        {
            var record = _agendaRepository.Get(aid);
            record.IsDiscussed = true;
            _agendaRepository.Modify(record);
        }

        public void MarkActionItemAsCompleted(string aid)
        {
            var record = _actionItemRepository.Get(aid);
            record.IsCompleted = true;
            _actionItemRepository.Modify(record);
        }

        public void DeleteAgenda(string aid)
        {
            _agendaRepository.Remove(aid);
        }
        #endregion

        public ActionItem AddActionItem(ActionItem actionItem)
        {
            _actionItemRepository.Add(actionItem);
            return actionItem;
        }

        public void DeleteActionItem(string aid)
        {
            _actionItemRepository.Remove(aid);
        }

        public IEnumerable<IndividualStatus> GetTeamStatus(IndividualStatusContext context)
        {
            var list = _userRepository.GetFiltered(p => p.Project == context.Project).Select(p => new IndividualStatus { AssignedTo = p.Username }).ToList();

            var newlist = _individualStatusRepository.GetFiltered(p => p.Date > context.Date.Date && p.Date < context.Date.AddDays(1).Date).ToList();
            foreach (var original in list)
            {
                var current = newlist.Where(p => p.AssignedTo == original.AssignedTo).SingleOrDefault();
                if (current != null)
                {
                    original.MergeWith<IndividualStatus>(current);
                }
                if (string.Compare(context.CurrentUser, original.AssignedTo, true) == 0)
                {
                    original.CanEdit = true;
                }
            }
            return list;
        }

        public IndividualStatus UpdateIndividualStatus(IndividualStatus status)
        {
            var record = _individualStatusRepository.Get(status._id);
            if (record != null)
            {
                record.MergeWith<IndividualStatus>(status);
                _individualStatusRepository.Modify(record);
            }
            else
            {
                status.Date = DateTime.Now;
                _individualStatusRepository.Add(status);
                record = status;
            }
            return record;
        }

        public IEnumerable<IndividualStatus> GetMemberwiseHistory(IndividualStatusContext context)
        {
            return _individualStatusRepository.GetFiltered(p => p.AssignedTo == context.CurrentUser).ToList();
        }

        public IEnumerable<ActionItem> GetActionItems(ActionItemContext context)
        {
            var list = _actionItemRepository.GetAll();
            if (context.Date.HasValue)
            {
                list = list.Where(p => p.Date > context.Date.Value.Date && p.Date < context.Date.Value.AddDays(1).Date);
            }
            return list.ToList();
        }
    }
}
