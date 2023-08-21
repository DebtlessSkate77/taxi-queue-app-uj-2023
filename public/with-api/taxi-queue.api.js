document.addEventListener('alpine:init', () => {
    Alpine.data('TaxiQueue', () => {
        return {
            version: 'api-1.0',
            queueLength: 0,
            taxiQueueLength: 0,
            init() {
                this.refreshQueueLength();
                this.refreshTaxiQueueLength();
            },
            joinQueue() {
                axios
                    .post('/api/passenger/join')
                    .then(() => {
                        this.refreshQueueLength();
                    });
            },
            leaveQueue() {
                axios
                    .post('/api/passenger/leave')
                    .then(() => {
                        this.refreshQueueLength();
                    });
            },
            joinTaxiQueue() {
                axios
                    .post('/api/taxi/join')
                    .then(() => {
                        this.refreshTaxiQueueLength();
                    });
            },
            taxiDepart() {
                axios
                    .post('/api/taxi/depart')
                    .then(() => {
                        this.refreshQueueLength();
                        this.refreshTaxiQueueLength();
                    });
            },
            refreshQueueLength() {
                axios
                    .get('/api/passenger/queue')
                    .then(result => {
                        this.queueLength = result.data.queueCount;
                    });
            },
            refreshTaxiQueueLength() {
                axios
                    .get('/api/taxi/queue')
                    .then(result => {
                        this.taxiQueueLength = result.data.queueCount;
                    });
            },
        };
    });
});