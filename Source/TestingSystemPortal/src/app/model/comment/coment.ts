export interface Comemts {
  id: string;
  news: string;
  content: string;
}
// <p>
//   tempate-container works!
// </p>
// <button class="btn btn-primary" (click)="editMode=!editMode"> Edit Mode </button>
// <table>
//    <tbody>
//       <ng-container *ngIf="editMode; else showMode">
//         <tr *ngFor="let item of arr">
//               <td><input type="text" [value]="item"></td>
//         </tr>
//       </ng-container>
//    </tbody>
// </table>
