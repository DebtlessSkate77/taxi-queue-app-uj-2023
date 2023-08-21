document.addEventListener('alpine:init', () => {
    Alpine.data('TaxiQueue', () => {


        return {
            version: 'no-api-1.0',
			
			peopleQueueCounter : 0,
			taxiQueueCounter : 0,
			departCounter : 0,

            joinQueue() {
				this.peopleQueueCounter++;
            },
            leaveQueue() {
                if (this.peopleQueueCounter > 0) {
                    this.peopleQueueCounter--;
                }
            },
            joinTaxiQueue() {
                this.taxiQueueCounter++;
            },
            queueLength() {
                return this.peopleQueueCounter;
            },
            taxiQueueLength() {
                return this.taxiQueueCounter;
            },
            taxiDepart() {
                if (this.taxiQueueCounter > 0 && this.peopleQueueCounter >= 12) {
                    this.taxiQueueCounter--;
                    this.peopleQueueCounter -= 12;
					
                }
            }
        };
    });
});