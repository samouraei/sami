const { expect } = require("chai");
const sinon = require("sinon");
const taskController = require("../controllers/taskController");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const AppError = require("../utils/appError");

describe("Task Controller - Create Task", function () {
    let req, res, next, mockUser, mockTask;

    beforeEach(function () {
        req = {
            body: {
                userID: "67960510b0d27250340c1fe4",
                name: "websocket",
                taskType: "backend task",
                validityPeriod: 5,
                duration: 5,
                urgencyLevel: "فوری"
            }
        };

        res = {
            json: sinon.stub(),
        };

        next = sinon.spy();

        // Mock User
        mockUser = {
            _id: "67960510b0d27250340c1fe4",
            tasks: [],
            save: sinon.stub().resolves()
        };

        // Mock Task
        mockTask = {
            _id: "task123",
            name: "websocket",
            taskType: "backend task",
            validityPeriod: 5,
            duration: 5,
            urgencyLevel: "فوری",
            refUser: "67960510b0d27250340c1fe4"
        };
    });

    afterEach(function () {
        sinon.restore();
    });

    it("should create a new task successfully", async function () {
        sinon.stub(User, "findById").resolves(mockUser);
        sinon.stub(Task.prototype, "save").resolves(mockTask);

        await taskController.createTask(req, res, next);

        // Check if res.json() is called once
        expect(res.json.calledOnce).to.be.true;

        const responseData = res.json.args[0][0];

        // Ensure the response data contains the expected properties
        expect(responseData).to.have.property("message", "تسک جدید ایجاد شد");
        expect(responseData).to.have.property("task");
        expect(responseData.task.name).to.equal("websocket");
    });

    it("should return an error if user not found", async function () {
        sinon.stub(User, "findById").resolves(null);

        await taskController.createTask(req, res, next);

        // Ensure that the error handling is triggered
        expect(next.calledOnce).to.be.true;

        const error = next.args[0][0];
        expect(error).to.have.property("message", "کاربر با این مشخصات یافت نشد.");
        expect(error).to.have.property("statusCode", 404);
    });
});
