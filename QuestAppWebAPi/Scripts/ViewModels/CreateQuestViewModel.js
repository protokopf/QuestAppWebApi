$(document).ready(function () {
    function CreateQuestViewModel() {
        var self = this;

        var _nullParentObject = { Title: "Without parent", Id: 0 };
        var createQuestData = function()
        {
            var parent = self.CurrentParent();

            var questData = {
                Title: self.Title(),
                Description: self.Description(),
                Deadline: self.Deadline(),
                ParentId: self.CurrentParent().Id,
                CurrentState: self.State(),
                IsImportant: self.IsImportant()
            };

            return questData;
        }

        self.Title = ko.observable("");
        self.Description = ko.observable("");
        self.Deadline = ko.observable("");
        self.CurrentParent = ko.observable(_nullParentObject);
        self.State = ko.observable(0);
        self.IsImportant = ko.observable(false);

        self.OtherQuests = ko.observableArray([_nullParentObject]);
        self.GetOtherQuests = function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:37993/api/Quests",
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
            self.Title("");
            self.Description("");
            self.Deadline("");
            self.CurrentParent(_nullParentObject);
            self.State(0);
            self.IsImportant(false);
        }
        self.CreateQuest = function () {
            var questData = createQuestData();
            $.ajax({
                type: "POST",
                url: "http://localhost:37993/api/Quests",
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