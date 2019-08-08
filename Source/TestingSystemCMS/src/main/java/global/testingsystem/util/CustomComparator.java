/**
 * 
 */
package global.testingsystem.util;

import java.util.Comparator;

import global.testingsystem.entity.News;

/**
 * @author User
 *
 */
public class CustomComparator implements Comparator<News> {
     private int type;
     private int typeSort;
     
	/**
	 * @param type
	 * @param typeSort
	 */
	public CustomComparator(int type,int typeSort) {
		super();
		this.type = type;
		this.typeSort=typeSort;
	}
	
	/* (non-Javadoc)
	 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
	 */
	@Override
	public int compare(News o1, News o2) {
		switch (type) {
		case 1:
			if(typeSort==1) {
			    return o1.getTitle().compareToIgnoreCase(o2.getTitle());
			}
			else {
				return -1*o1.getTitle().compareToIgnoreCase(o2.getTitle());
			}
			
        case 2:
        	if(typeSort==1) {
 			   return o1.getContent().compareToIgnoreCase(o2.getContent());
 			}
 			else {
 				 return -1*o1.getContent().compareToIgnoreCase(o2.getContent());
 			}
		
          case 3:
        	  if(typeSort==1) {
   			   return o1.getDescription().compareToIgnoreCase(o2.getDescription());
   			}
   			else {
   				return -1*o1.getDescription().compareToIgnoreCase(o2.getDescription());
   			}
	      
         case 4:
        	 if(typeSort==1) {
  			   return o1.getUpStatus().compareToIgnoreCase(o2.getUpStatus());
  			}
  			else {
  				return -1*o1.getUpStatus().compareToIgnoreCase(o2.getUpStatus());
  			}
	      
            case 5:
            	if(typeSort==1) {
     			   return o1.getCreateDate().compareTo(o2.getCreateDate());
     			}else {
     				 return -1*o1.getCreateDate().compareTo(o2.getCreateDate());
     			}
	       
          case 6:
        	  if(typeSort==1) {
   			   return o1.getConfirmDate().compareTo(o2.getConfirmDate());
   			}
   			else {
   				  return -1*o1.getConfirmDate().compareTo(o2.getConfirmDate());
   			}
		case 7:
        	  if(typeSort==1) {
  			    return String.valueOf(o1.isActive()).compareToIgnoreCase(String.valueOf(o2.isActive()));
  			}
  			else {
  				return -1*String.valueOf(o1.isActive()).compareToIgnoreCase(String.valueOf(o2.isActive()));
  			}
		case 8:
      	  if(typeSort==1) {
			    return String.valueOf(o1.isPinned()).compareToIgnoreCase(String.valueOf(o2.isPinned()));
			}
			else {
				return -1*String.valueOf(o1.isPinned()).compareToIgnoreCase(String.valueOf(o2.isPinned()));
			}
        	 
	
		      default:
		    	  if(typeSort==1) {
					    return o1.getUsers_confirm().getFullname().compareToIgnoreCase(o2.getUsers_confirm().getFullname());
					}
					else {
						 return -1*o1.getUsers_confirm().getFullname().compareToIgnoreCase(o2.getUsers_confirm().getFullname());
					}
		
		}
	}
//		if(type==1) {
//			if(typeSort==1) {
//			    return o1.getTitle().compareToIgnoreCase(o2.getTitle());
//			}
//			else {
//				return -1*o1.getTitle().compareToIgnoreCase(o2.getTitle());
//			}
//		}
//		else if(type==2) {
//			if(typeSort==1) {
//			   return o1.getContent().compareToIgnoreCase(o2.getContent());
//			}
//			else {
//				 return -1*o1.getContent().compareToIgnoreCase(o2.getContent());
//			}
//		}
//		else if(type==3) {
//			if(typeSort==1) {
//			   return o1.getDescription().compareToIgnoreCase(o2.getDescription());
//			}
//			else {
//				return -1*o1.getDescription().compareToIgnoreCase(o2.getDescription());
//			}
//		}
//		else if(type==4) {
//			if(typeSort==1) {
//			   return o1.getUpStatus().compareToIgnoreCase(o2.getUpStatus());
//			}
//			else {
//				return -1*o1.getUpStatus().compareToIgnoreCase(o2.getUpStatus());
//			}
//		}
//		else if(type==5) {
//			if(typeSort==1) {
//			   return o1.getCreateDate().compareToIgnoreCase(o2.getCreateDate());
//			}else {
//				 return -1*o1.getCreateDate().compareToIgnoreCase(o2.getCreateDate());
//			}
//		}
//		else if(type==6) {
//			if(typeSort==1) {
//			   return o1.getConfirmDate().compareToIgnoreCase(o2.getConfirmDate());
//			}
//			else {
//				  return -1*o1.getConfirmDate().compareToIgnoreCase(o2.getConfirmDate());
//			}
//		}
//		else if(type==7) {
//			if(typeSort==1) {
//			    return String.valueOf(o1.isActive()).compareToIgnoreCase(String.valueOf(o2.isActive()));
//			}
//			else {
//				return -1*String.valueOf(o1.isActive()).compareToIgnoreCase(String.valueOf(o2.isActive()));
//			}
//		}
//		else
//			if(typeSort==1) {
//			    return o1.getConfirmer().getName().compareToIgnoreCase(o2.getConfirmer().getName());
//			}
//			else {
//				 return -1*o1.getConfirmer().getName().compareToIgnoreCase(o2.getConfirmer().getName());
//			}
//		}

}
