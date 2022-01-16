var Team = function () {
    this.NextTeamId = 7;
    this.TeamGrid = {};

    this.AddTeamModal = new bootstrap.Modal(document.getElementById('addTeamModal'), {
        keyboard: false
    });
    this.Teams = [
        {
            Id : 1,
            Name: "Research",
            ParentId: 0
        },
        {
            Id : 2,
            Name: "Finace",
            ParentId: 0
        },
        {
            Id : 3,
            Name: "Dev",
            ParentId: 1
        },
        {
            Id : 4,
            Name: "QA",
            ParentId: 1
        },
        {
            Id : 5,
            Name: "Sub-Finace1",
            ParentId: 2
        },
        {
            Id : 6,
            Name: "Sub-Finace2",
            ParentId: 2
        }
    ];

    this.GetTeam = function (id) {
        for (var i = 0; i < this.Teams.length; i++) {
            if (this.Teams[i].Id == id) {
                return this.Teams[i];
            }
        }
    };

    this.InitGrid = function () {
        var data = team.Teams.map(t => [t.Name, team.GetTeam(t.ParentId)?.Name]);
        this.TeamGrid = new gridjs.Grid({
            columns: [
                {
                    name: "Name",
                    width: '500px'
                },
                {
                    name: "Parent Team",
                    width: '500px'
                }],
            data: data,
        }).render(document.getElementById("teamWrapper"));
    };

    this.ShowGrid = function () {
        var data = team.Teams.map(t => [t.Name, team.GetTeam(t.ParentId)?.Name]);
        this.TeamGrid.updateConfig({
            data: data
        }).forceRender();
    };

    this.ShowAddTeam = function () {
        this.ShowTeamErrorMessage(false, "");
        var assignTeamBody = document.getElementById('addTeamBody');
        assignTeamBody.innerHTML = "";
        $("#newTeamName").val("");
        var label = document.createElement("label");
        label.className = "form-label";
        label.innerText = "Please select parent team!"
        assignTeamBody.appendChild(label);
        var select = document.createElement("select");
        select.className = "form-select";
        select.id = "Level1AddTeamSelect";
        var option = document.createElement("option");
        option.selected = true;
        option.text = "Please select a team";
        option.value = 0;
        select.appendChild(option);
        for (var i = 0; i < team.Teams.length; i++) {
            if (team.Teams[i].ParentId == 0) {
                var option = document.createElement("option");
                option.value = team.Teams[i].Id;
                option.text = team.Teams[i].Name;
                select.appendChild(option);
            }
        }
        assignTeamBody.appendChild(select);
        $('#Level1AddTeamSelect').change(function () {
            var selectTeam = $(this).children('option:selected').val();
            var assignTeamBody = document.getElementById('addTeamBody');
            var select = document.createElement("select");
            select.className = "form-select Level2Team";
            select.id = "Level2AddTeamSelect";
            var option = document.createElement("option");
            option.selected = true;
            option.text = "Please select a team";
            option.value = 0;
            select.appendChild(option);
            for (var i = 0; i < team.Teams.length; i++) {
                if (team.Teams[i].ParentId == selectTeam) {
                    var option = document.createElement("option");
                    option.value = team.Teams[i].Id;
                    option.text = team.Teams[i].Name;
                    select.appendChild(option);
                }
            }
            assignTeamBody.appendChild(select);
        })
        this.AddTeamModal.show();
    }

    this.HideAddTeam = function () {
        this.AddTeamModal.hide();
    };

    this.SaveAddTeam = function () {
        this.ShowTeamErrorMessage(false, "");
        var teamid = $("#Level2AddTeamSelect").children('option:selected').val();
        if (teamid == 0 || !teamid) {
            teamid = $("#Level1AddTeamSelect").children('option:selected').val();
        }
        var teamName = $("#newTeamName").val();
        if (this.TeamValid(teamName.toLowerCase(), teamid)) {
            this.Teams.push({
                Name: teamName,
                Id: this.NextTeamId,
                ParentId: teamid
            });
            this.NextTeamId++;
            this.ShowGrid();
            this.AddTeamModal.hide();
        }
    };

    this.TeamValid = function (name, id) {
        if (name) {
            for (var i = 0; i < this.Teams.length; i++) {
                if (this.Teams[i].ParentId == id && this.Teams[i].Name.toLowerCase() == name) {
                    var parentName = this.GetTeam(this.Teams[i].ParentId)?.Name;
                    this.ShowTeamErrorMessage(true, 0, parentName);
                    return false;
                }
            }
            return true;
        }
        else {
            this.ShowTeamErrorMessage(true, 1, "");
            return false;
        }
    }

    this.ShowTeamErrorMessage = function (show, type, name) {
        if (show) {
            var teamerror = document.getElementById('teamerror');
            if (type == 1) {
                teamerror.innerText = "Team name is required!";
            }
            else {
                if (name) {
                    teamerror.innerText = "This team name allready exist under: " + name;
                }
                else {
                    teamerror.innerText = "This team name allready exist.";
                }
            }
            $("#teamerror").show();
        }
        else {
            $("#teamerror").hide();
        }
    }
};

var People = function () {
    this.UserView = 0;
    this.NextEmployeeId = 6;

    this.AddPeopleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    });

    this.AssignTeamModal = new bootstrap.Modal(document.getElementById('assignTeamModal'), {
        keyboard: false
    });

    this.AssignManagerModal = new bootstrap.Modal(document.getElementById('assignmanager'), {
        keyboard: false
    });

    this.PeopleGrid = {};

    this.Employees = [
        {
            Id : 1,
            Name: "Kasen",
            FirstName: "QingChun",
            LastName: "Li",
            TeamId: 1,
            ManagerId: 0,
            Email: "Kasen@163.com",
            PhoneNumber: "",
            Address: "",
            Birth: "",
            Age: 30
        },
        {
            Id: 2,
            Name: "Rae",
            TeamId: 2,
            ManagerId: 0,
            Email: "Kasen@163.com",
            Age: 30
        },
        {
            Id: 3,
            Name: "QingChun",
            TeamId: 3,
            ManagerId: 1,
            Email: "Kasen@163.com",
            Age: 30
        },
        {
            Id: 4,
            Name: "KasenLee",
            TeamId: 3,
            ManagerId: 1,
            Email: "Kasen@163.com",
            Age: 30
        },
        {
            Id: 5,
            Name: "New Staff",
            TeamId: 0,
            ManagerId: 0,
            Email: "Kasen@163.com",
            Age: 30
        }
    ];

    this.GetEmployee = function (id) {
        for (var i = 0; i < this.Employees.length; i++) {
            if (this.Employees[i].Id == id) {
                return this.Employees[i];
            }
        }
    };

    this.GetEmployeeByName = function (name) {
        for (var i = 0; i < this.Employees.length; i++) {
            if (this.Employees[i].Name.toLowerCase() == name.toLowerCase()) {
                return this.Employees[i];
            }
        }
    };

    this.InitGrid = function () {
        var data = new Array();
        if (this.UserView == 0) {
            for (var i = 0; i < this.Employees.length; i++) {
                if (this.Employees[i].TeamId <= 0) {
                    data.push([this.Employees[i].Name, team.GetTeam(this.Employees[i].TeamId)?.Name, people.GetEmployee(this.Employees[i].ManagerId)?.Name, this.Employees[i].Email, this.Employees[i].Age]);
                }
            }
        }
        this.PeopleGrid = new gridjs.Grid({
            columns: [
                {
                    name: "Name",
                    width: '200px'
                },
                {
                    name: "Team",
                    width: '200px',
                    sort: false
                },
                {
                    name: "Manager",
                    width: '200px',
                    sort: false
                },
                {
                    name: "Email",
                    width: '300px',
                    sort: false
                },
                {
                    name: "Age",
                    width: '100px',
                    sort: false
                }],
            data: data,
            sort: true
        }).render(document.getElementById("wrapper"));
    };

    this.ShowGrid = function () {
        var data = new Array();
        if (this.UserView == 0) {
            for (var i = 0; i < this.Employees.length; i++) {
                if (this.Employees[i].TeamId <= 0) {
                    data.push([this.Employees[i].Name, team.GetTeam(this.Employees[i].TeamId)?.Name, people.GetEmployee(this.Employees[i].ManagerId)?.Name, this.Employees[i].Email, this.Employees[i].Age]);
                }
            }
        }
        else {
            data = people.Employees.map(p => [p.Name, team.GetTeam(p.TeamId)?.Name, people.GetEmployee(p.ManagerId)?.Name, p.Email, p.Age]);
        }
        this.PeopleGrid.updateConfig({
            data: data
        }).forceRender();
    };

    this.ShowAddPeople = function () {
        this.ShowPeopleErrorMessage(false);
        this.AddPeopleModal.show();
    };

    this.HideAddPeople = function () {
        this.AddPeopleModal.hide();
    };

    this.SaveAddPeople = function () {
        if (this.NewPeopleValid()) {
            var employee = {
                Id: this.NextEmployeeId,
                Name: $("#userNameInput").val(),
                TeamId: 0,
                ManagerId: this.GetEmployeeByName($("#userManagerInput").val())?.Id,
                Email: $("#userEmailInput").val(),
                Age: $("#userAgeInput").val()
            };
            this.Employees.push(employee);
            this.NextEmployeeId++;
            this.AddPeopleModal.hide();
            this.ShowGrid();
        }
    };

    this.NewPeopleValid = function () {
        if (!$("#userNameInput").val()) {
            this.ShowPeopleErrorMessage(true);
            return false;
        }
        return true;
    }

    this.ShowPeopleErrorMessage = function (show) {
        if (show) {
            $("#addpeopleerror").show();
        }
        else {
            $("#addpeopleerror").hide();
        }
    }

    this.ShowPeople = function (type) {
        this.UserView = type;
        if (type == 0) {
            document.getElementById("dropdownMenuButton1").innerText = "Unassigned People";
        }
        else {
            document.getElementById("dropdownMenuButton1").innerText = "All People";
        }
        this.ShowGrid();
    };

    this.ShowAssignTeam = function () {
        this.ShowTeamErrorMessage(false);
        var assignTeamBody = document.getElementById('assignTeamBody');
        assignTeamBody.innerHTML = "";
        var select = document.createElement("select");
        select.className = "form-select";
        select.id = "Level1TeamSelect";
        var option = document.createElement("option");
        option.selected = true;
        option.text = "Please select a team";
        option.value = 0;
        select.appendChild(option);
        for (var i = 0; i < team.Teams.length; i++) {
            if (team.Teams[i].ParentId == 0) {
                var option = document.createElement("option");
                option.value = team.Teams[i].Id;
                option.text = team.Teams[i].Name;
                select.appendChild(option);
            }
        }
        assignTeamBody.appendChild(select);
        $('#Level1TeamSelect').change(function () {
            var selectTeam = $(this).children('option:selected').val();
            var assignTeamBody = document.getElementById('assignTeamBody');
            var select = document.createElement("select");
            select.className = "form-select Level2Team";
            select.id = "Level2TeamSelect";
            var option = document.createElement("option");
            option.selected = true;
            option.text = "Please select a team";
            option.value = 0;
            select.appendChild(option);
            for (var i = 0; i < team.Teams.length; i++) {
                if (team.Teams[i].ParentId == selectTeam) {
                    var option = document.createElement("option");
                    option.value = team.Teams[i].Id;
                    option.text = team.Teams[i].Name;
                    select.appendChild(option);
                }
            }
            assignTeamBody.appendChild(select);
        })
        this.AssignTeamModal.show();
    }

    this.HideAssignTeam = function () {
        this.AssignTeamModal.hide();
    };

    this.SaveAssignTeam = function () {
        var teamid = $("#Level2TeamSelect").children('option:selected').val();
        if (teamid == 0 || !teamid) {
            teamid = $("#Level1TeamSelect").children('option:selected').val();
        }
        if (this.TeamValid(teamid)) {
            for (var i = 0; i < this.Employees.length; i++) {
                if (this.Employees[i].TeamId <= 0) {
                    this.Employees[i].TeamId = teamid;
                }
            }
            this.ShowGrid();
            this.AssignTeamModal.hide();
        }
    };

    this.TeamSelected = function (e) {
        alert(123);
    }

    this.TeamValid = function (id) {
        if (id == 0) {
            this.ShowTeamErrorMessage(true);
            return false;
        }
        return true;
    }

    this.ShowTeamErrorMessage = function (show) {
        if (show) {
            $("#assignteamerror").show();
        }
        else {
            $("#assignteamerror").hide();
        }
    }

    this.ShowAssignManager = function () {
        this.ShowAssignManagerErrorMessage(false);
        this.AssignManagerModal.show();
    }

    this.SaveAssignManager = function () {
        if (this.ManagerValid()) {
            var managerName = $("#managerNameInput").val();
            var manager = this.GetEmployeeByName(managerName);
            for (var i = 0; i < this.Employees.length; i++) {
                this.Employees[i].ManagerId = manager.Id;
            }
            this.ShowGrid();
            this.AssignManagerModal.hide();
        }
    };
    this.HideAssignManager = function () {
        this.AssignManagerModal.hide();
    }

    this.ManagerValid = function () {
        var manager = $("#managerNameInput").val();
        if (!manager) {
            this.ShowAssignManagerErrorMessage(true, 0);
            return false;
        }
        else {
            var manager = this.GetEmployeeByName(manager);
            if (!manager) {
                this.ShowAssignManagerErrorMessage(true, 1);
                return false;
            }
        }
        return true;
    }

    this.ShowAssignManagerErrorMessage = function (show, type) {
        if (show) {
            var managererror = document.getElementById('assignmanagererror');
            if (type == 0) {
                managererror.innerText = "Manager name is required!";
            }
            else {
                managererror.innerText = "The manager does not exist.";
            }
            $("#assignmanagererror").show();
        }
        else {
            $("#assignmanagererror").hide();
        }
    }
};
var people = new People();
var team = new Team();

function PageChange(page) {
    if (page == 0) {
        $("#TeamContainer").hide();
        $("#PeopleContainer").hide();
        $("#HomeContainer").show();
    }
    else if (page == 1) {
        $("#TeamContainer").hide();
        $("#HomeContainer").hide();
        $("#PeopleContainer").show();
    }
    else {
        $("#HomeContainer").hide();
        $("#PeopleContainer").hide();
        $("#TeamContainer").show();

    }
}