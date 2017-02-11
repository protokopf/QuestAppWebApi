using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using QuestAppWebApi.DataStorage.Entities;
using QuestAppWebApi.DataStorage.Model;

namespace QuestAppWebAPi.Controllers
{
    /// <summary>
    /// Quest list api controller
    /// </summary>
    public class QuestsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            using (QuestDataBaseContext context = new QuestDataBaseContext())
            {
                return Request.CreateResponse(HttpStatusCode.OK, context.Quests.ToList());
            }
        }

        public HttpResponseMessage Get(int id)
        {
            using (QuestDataBaseContext context = new QuestDataBaseContext())
            {
                Quest getted = context.Quests.FirstOrDefault(q => q.Id == id);
                if (getted == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, new Exception($"Quest with id {id} is not found!"));
                }
                return Request.CreateResponse<Quest>(HttpStatusCode.OK, getted);
            }
        }

        public HttpResponseMessage Post(Quest model)
        {
            if(model == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Posted data is not specified!"));
            }
            using (QuestDataBaseContext context = new QuestDataBaseContext())
            {
                context.Quests.Add(model);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, model);
            }
        }

        public HttpResponseMessage Put(int id, Quest quest)
        {
            if (quest != null)
            {
                using (QuestDataBaseContext context = new QuestDataBaseContext())
                {
                    Quest changed = context.Quests.FirstOrDefault(q => q.Id == id);
                    if (changed != null)
                    {
                        changed.ParentId = quest.ParentId;
                        changed.Title = quest.Title;
                        changed.Description = quest.Description;
                        changed.StartDate = quest.StartDate;
                        changed.Deadline = quest.Deadline;
                        changed.IsImportant = quest.IsImportant;
                        changed.CurrentState = quest.CurrentState;
                        context.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, quest);
                    }
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, new Exception($"Quest with id {id} not found!"));
                }
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Data for updating is not specified!"));
        }

        public HttpResponseMessage Delete(int id)
        {
            using (QuestDataBaseContext context = new QuestDataBaseContext())
            {
                Quest deleted = context.Quests.FirstOrDefault(q => q.Id == id);
                if (deleted != null)
                {
                    context.Quests.Remove(deleted);
                    context.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, deleted);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, new Exception($"Quest with id {id} not found!"));
            }
        }
    }
}
