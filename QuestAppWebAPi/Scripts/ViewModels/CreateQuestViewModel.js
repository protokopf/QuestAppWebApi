$(document).ready(function () {
    function QuestModel(title, description, deadline, parent, state, isImportant)
    {
        var self = this;

        self.Title = ko.observable(title);
        self.Description = ko.observable(description);
        self.Deadline = ko.observable(deadline);
        self.Parent = ko.observable(parent);
        self.State = ko.observable(state);
        self.IsImportant = ko.observable(isImportant);

        self.Reset = function(){
            self.Title("");
            self.Description("");
            self.Deadline("");
            self.Parent("");
            self.State(0);
            self.IsImportant(false);
        }
    }

    function CreateQuestViewModel() {
        var self = this;

        var _nullParentObject = { Title: "Without parent", Id: 0 };

        var createQuestModel = function () {
            return new QuestModel("", "", "", _nullParentObject, 0, false);
        }
        var createQuestData = function()
        {
            var questData = {
                Title: self.CurrentQuest().Title(),
                Description: self.CurrentQuest().Description(),
                Deadline: self.CurrentQuest().Deadline(),
                ParentId: self.CurrentQuest().Parent().Id,
                CurrentState: self.CurrentQuest().State(),
                IsImportant: self.CurrentQuest().IsImportant()
            };
            return questData;
        }

        self.CurrentQuest = ko.observable(createQuestModel());
        self.OtherQuests = ko.observableArray([_nullParentObject]);
        self.GetOtherQuests = function () {
            $.ajax({
                type: "GET",
                url: "/api/Quests",
                dataType: "json",
                success: function (data) {
                    self.OtherQuests([_nullParentObject]);
                    var length = data.length;
                    for(var i = 0; i < length; ++i){
                        self.OtherQuests.push(data[i]);
                    }
                }
            });
        };

        self.ClearViewModel = function () {
            self.CurrentQuest().Title("");
            self.CurrentQuest().Description("");
            self.CurrentQuest().Deadline("");
            self.CurrentQuest().Parent("");
            self.CurrentQuest().State(0);
            self.CurrentQuest().IsImportant(false);
        }
        self.CreateQuest = function () {
            var questData = createQuestData();
            $.ajax({
                type: "POST",
                url: "/api/Quests",
                dataType: "json",
                data: questData,
                success: function () {
                    alert("Quest created!");
                    self.ClearViewModel();
                },
                error: function (jqXHR, status, error) {
                    alert("Failed to create quest. Error: " + error);
                    self.ClearViewModel();
                }         
            });
        };
        self.GetParentTitle = function(item){
            return item.Title;
        }
    }

    ko.applyBindings(new CreateQuestViewModel());
});