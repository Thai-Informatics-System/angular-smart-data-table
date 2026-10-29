import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription, of, Subject, takeUntil } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

export class ApiDataSource implements DataSource<any> {

    private apiSubs!: Subscription;

    apiSubject = new BehaviorSubject<any[]>([]);
    extraDataSubject = new BehaviorSubject<any>(null);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    public totalDataLength = new BehaviorSubject<number | null>(null);
    public totalDataLength$ = this.totalDataLength.asObservable();

    private errorSubject = new Subject<unknown | null>();
    /** Emits the error when a load fails, and `null` when a load succeeds. */
    public error$ = this.errorSubject.asObservable();

    constructor(private apiService: ApiService) { 
        console.log(' DataSource Initialized...')
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.apiSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.apiSubject.complete();
        this.extraDataSubject.complete();
        this.loadingSubject.complete();
        this.errorSubject.complete();

        if(this.apiSubs) {
            this.apiSubs.unsubscribe();
        }
    }

    load(url: string, pageIndex: number, pageSize: number, search: string, filter?: object, sortFilter?: object) {

        if(this.apiSubs) {
            this.apiSubs.unsubscribe();
        }

        this.loadingSubject.next(true);
        
        let failed = false;
        this.apiSubs = this.apiService.getList(url, (pageIndex + 1), pageSize, search, {filter}, {sortFilter}).pipe(
            catchError((error) => {
                failed = true;
                this.errorSubject.next(error ?? new Error('Unknown error'));
                return of(null);
            }),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(r => this.handleReply(url, r, failed));
    }

    loadWithCancellation(url: string, pageIndex: number, pageSize: number, search: string, filter?: object, sortFilter?: object, cancelSubject?: Subject<void>) {

        if(this.apiSubs) {
            this.apiSubs.unsubscribe();
        }

        this.loadingSubject.next(true);
        
        let failed = false;
        let apiCall$ = this.apiService.getList(url, (pageIndex + 1), pageSize, search, {filter}, {sortFilter}).pipe(
            catchError((error) => {
                failed = true;
                this.errorSubject.next(error ?? new Error('Unknown error'));
                return of(null);
            }),
            finalize(() => this.loadingSubject.next(false))
        );

        // Add cancellation capability if provided
        if (cancelSubject) {
            apiCall$ = apiCall$.pipe(takeUntil(cancelSubject));
        }

        this.apiSubs = apiCall$.subscribe(r => this.handleReply(url, r, failed));
    }

    private handleReply(url: string, r: any, failed: boolean) {
        console.log(`DataSource: Url: ${url}, Reply:`, r);

        // ✅ FIX: Ensure we always emit an array (even if empty) to prevent undefined issues
        // (a failed load also lands here, with r = null, and empties the table).
        const data = r?.data || [];
        const total = (Array.isArray(data) && data.length > 0) ? (r?.total || data.length) : 0;

        this.totalDataLength.next(total);
        this.apiSubject.next(data);
        this.extraDataSubject.next(r?.extraData || null);

        if (!failed) {
            this.errorSubject.next(null);
        }
    }
}
