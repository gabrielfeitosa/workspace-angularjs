(function(self) {
    /**
     * @desc    - Creates a mock of the $modalInstance object that the $modal service would typically use when creating a $modal so that we can intercept and spy on methods.
     * @returns {close: function, dismiss: function, result: {then: function, catch: function}}
     * @remarks - close and dismiss are jasmine spies.
     *                 result emulates a promise, so the 'then' and 'catch' are spies that accept function callbacks
                     if 'then' and 'catch' callbacks provided, they will be called by 'close' and 'dimsiss', respectively
     */
    self.mockModalInstance = function() {
        return {
            close: jasmine.createSpy('modalInstance.close').andCallFake(function (data) {
                if(this.result.confirmCB && typeof this.result.confirmCB === 'function') {
                    this.result.confirmCB(data);
                }
            }),
            dismiss: jasmine.createSpy('modalInstance.dismiss').andCallFake(function (reason) {
                if(this.result.cancelCB && typeof this.result.cancelCB === 'function') {
                    this.result.cancelCB(reason);
                }
            }),
            result: {
                then: jasmine.createSpy('modalInstance.result.then').andCallFake(function (confirm, cancel) {
                    this.confirmCB = confirm || this.confirmCB;
                    this.cancelCB = cancel || this.cancelCB;
                }),
                catch: jasmine.createSpy('modalInstance.result.catch').andCallFake(function (cb) {
                    this.cancelCB = cb || this.cancelCB;
                })
            }
        };
    };
}((module || {}).exports || window));
