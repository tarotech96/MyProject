/**
 *
 */
package global.testingsystem.configure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import global.testingsystem.filter.CustomAccessDeniedHandler;
import global.testingsystem.filter.JwtAuthenticationTokenFilter;
import global.testingsystem.filter.RestAuthenticationEntryPoint;

/**
 * @author admin
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Bean
        public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
                JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
                jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
                return jwtAuthenticationTokenFilter;
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public RestAuthenticationEntryPoint restAuthenticationEntryPoint() {
                return new RestAuthenticationEntryPoint();
        }

        @Bean
        public CustomAccessDeniedHandler customAccessDeniedHandler() {
                return new CustomAccessDeniedHandler();
        }

        @Bean
        @Override
        protected AuthenticationManager authenticationManager() throws Exception {
                return super.authenticationManager();
        }

        protected void configure(HttpSecurity http) throws Exception {
                http.csrf().disable().authorizeRequests()
                        .antMatchers("**/users/**", "**/permission/**", "**/subject/**",
                                "**/role/**", "**/chapter/**", "**/domain/**",
                                "**/group/**", "**/exam/**", "**/question/**",
                                "**/customer/**", "**/examResult/**", "**/examAnswer/**", "**/downloadFileExcel/**").authenticated()
                        .and()
                        .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint())
                        .and()
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                http.cors();
                http.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
                http.headers().cacheControl();
        }



}
