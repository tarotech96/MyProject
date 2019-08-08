package global.testingsystem.filter;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import global.testingsystem.entity.Users;
import global.testingsystem.repository.PermissionRepository;
import global.testingsystem.service.JwtService;
import global.testingsystem.service.UsersService;
/**
 * @author admin
 *
 */
public class JwtAuthenticationTokenFilter extends AbstractAuthenticationProcessingFilter {
        public JwtAuthenticationTokenFilter() {
                super("/rest/**");
        }

        private final static String TOKEN_HEADER = "TOKEN";
        @Autowired
        private JwtService jwtService;

        @Autowired
        private UsersService usersService;
        @Autowired
        PermissionRepository permissionRepository;
        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {
                HttpServletRequest httpRequest = (HttpServletRequest) request;
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                String url = httpRequest.getRequestURI();
                String headerToken = httpRequest.getHeader(TOKEN_HEADER);
                String listRolePermissionAndMenu = httpRequest.getHeader("ListRolePermission");
                httpResponse.setHeader("Access-Control-Allow-Origin", "*");
                httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                httpResponse.setHeader("Access-Control-Max-Age", "3600");
                httpResponse.setHeader("Access-Control-Allow-Headers", "*");
                httpResponse.addHeader("Access-Control-Expose-Headers", "xsrf-token");
                
                String[] urlOfRole = url.split("/");
             
                if(urlOfRole!=null) {
                int len= urlOfRole.length;
                if(len<2) {
                	httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                	httpResponse.getWriter().write("Loi khong co token!!!");
                	return ;
                };
                if (url.split("/")[1].contains("login")
                        || url.split("/")[1].contains("logout")
                        || url.split("/")[1].contains("registration")
                        || url.split("/")[1].contains("forgotpass")
                        || url.split("/")[1].contains("news")
                        || url.split("/")[1].contains("slidebanner")
                        || url.split("/")[1].contains("practice")
                        || url.split("/")[1].contains("home")
                        || url.split("/")[1].contains("active")
                        || url.split("/")[1].contains("activeforgotpass")
                        || url.split("/")[1].contains("active_account")
                        || url.split("/")[1].contains("images")
                        || url.split("/")[1].contains("resources")
                        || url.split("/")[1].contains("changepassword")
                        || url.split("/")[len -1].contains("downloadFileExcel")) {
                        chain.doFilter(request, response);
                }      
                else {
                        if (headerToken == null || "Tokennull".equals(headerToken)) {
                        	httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        	httpResponse.getWriter().write("Loi khong co token!!!");
                        	return ;
                        }
                        System.out.println("headerToken:   "+headerToken);
                        String authToken = headerToken.substring(5);
                        if (jwtService.validateTokenLogin(authToken) == 2) {
                                String username = jwtService.getUsernameFromToken(authToken);

                                Users users = usersService.findByEmail(username);

                                if (users != null) {
//                                        boolean enabled = true;
//                                        boolean accountNonExpired = true;
//                                        boolean credentialsNonExpired = true;
//                                        boolean accountNonLocked = true;
//                                        UserDetails userDetails = new User(username, users.getPassword(), enabled, accountNonExpired,
//                                                credentialsNonExpired, accountNonLocked,
//                                                (Collection<? extends GrantedAuthority>) users.getAuthorities());
//                                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                                                userDetails, null, userDetails.getAuthorities());
//                                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
//                                        SecurityContextHolder.getContext().setAuthentication(authentication);
//                                        getAuthenticationManager().authenticate(authentication);
                                	   System.out.println("url:  "+url);
                                         String controller = urlOfRole[1];
                                     
                                         String action= len>2?urlOfRole[2]:"";
                                         Integer checkExist=permissionRepository.checkExistPermissionSystem(controller, action);
                                         if(checkExist==0) {
                                        	 chain.doFilter(request, response);
                                        	 return;
                                         }
                                         else {
                                        	 Integer checkPermissionUser =permissionRepository.checkPermissionOfUser(users.getId(), controller, action);
                                        	 if(checkPermissionUser==null){
                                            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                                         	httpResponse.getWriter().write("Bạn không có quyền!!!");
                                         	return;
                                        	 }
                                         }
//                                        Map<String, String> listPermissionAndMenuOfRole = new HashMap<>();
//                                        String role = jwtService.getRoleFromToken(authToken);
//                                        String[] listRole = role.split(",");
//                                        String[] listRolePerandMenu = listRolePermissionAndMenu.split(",");
//                                        int listRolelength = listRole.length;
//                                        int listRolePerAndMenulength = listRolePerandMenu.length;
//                                        for (int index = 0; index < listRolelength; index++) {
//                                                for (int index1 = 0; index1 <= listRolePerAndMenulength - 4; index1 += 4) {
//                                                        String old = listPermissionAndMenuOfRole.get(listRole[index]);
//                                                        if (old == null)
//                                                                old = "";
//                                                        if (listRolePerandMenu[index1].equals(listRole[index])) {
//                                                                old += listRolePerandMenu[index1 + 2] + listRolePerandMenu[index1 + 3] + ",";
//                                                        }
//                                                        listPermissionAndMenuOfRole.put(listRole[index], old);
//                                                }
//                                        }
//                                        for (int index = 0; index < listRole.length; index++) {
//                                                String actionOfRole = listPermissionAndMenuOfRole.get(listRole[index]);
//                                                if (actionOfRole.contains(urlOfRole[1]));
//                                        }
                                       
                                }
                        } else if(jwtService.validateTokenLogin(authToken) == 1){
                        	httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        	httpResponse.getWriter().write("Token het han!!!");
                        	return;
                        }
                        chain.doFilter(request, response);
                }
                }
                else chain.doFilter(request, response);

        }

        @Override
        public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
                throws AuthenticationException, IOException, ServletException {
                // TODO Auto-generated method stub
                return null;
        }
}