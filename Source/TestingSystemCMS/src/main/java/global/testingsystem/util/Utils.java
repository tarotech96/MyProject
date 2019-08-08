package global.testingsystem.util;

import java.io.File;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class Utils {
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param d
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static String changeDateToString(Date d) {
		StringBuilder sb = new StringBuilder();
		sb.append(d.getMonth()+1).append("-").append(d.getDate()).append("-").append(d.getYear() + 1900);
		System.out.println(sb.toString());
		return sb.toString();
	}
	
	private static final char PKG_SEPARATOR = '.';

	private static final char DIR_SEPARATOR = '/';

	private static final String CLASS_FILE_SUFFIX = ".class";

	private static final String BAD_PACKAGE_ERROR = "Unable to get resources from path '%s'. Are you sure the package '%s' exists?";

	public static List<Class<?>> find(String scannedPackage) {
		try {
		String scannedPath = scannedPackage.replace(PKG_SEPARATOR, DIR_SEPARATOR);
		URL scannedUrl = Thread.currentThread().getContextClassLoader().getResource(scannedPath);
		if (scannedUrl == null) {
			throw new IllegalArgumentException(String.format(BAD_PACKAGE_ERROR, scannedPath, scannedPackage));
		}
		String url = scannedUrl.toString();
		url = url.replaceAll("%20", " ");
		URI uri = new URI(url);
		URL urlfix = uri.toURL(); 
		File scannedDir = new File(urlfix.getFile());
		List<Class<?>> classes = new ArrayList<Class<?>>();
		for (File file : scannedDir.listFiles()) {
			classes.addAll(find(file, scannedPackage));
		}
		return classes;
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	private static List<Class<?>> find(File file, String scannedPackage) {
		List<Class<?>> classes = new ArrayList<Class<?>>();
		String resource = scannedPackage + PKG_SEPARATOR + file.getName();
		if (file.isDirectory()) {
			for (File child : file.listFiles()) {
				classes.addAll(find(child, resource));
			}
		} else if (resource.endsWith(CLASS_FILE_SUFFIX)) {
			int endIndex = resource.length() - CLASS_FILE_SUFFIX.length();
			String className = resource.substring(0, endIndex);
			try {
				classes.add(Class.forName(className));
			} catch (ClassNotFoundException ignore) {
			}
		}
		return classes;
	}
	
	public static List<String> methodOfObject = Arrays.asList("wait", "equals", "toString", "hashCode",
			"getClass", "notify", "notifyAll");

	public static List<String> getMethod(String nameController) {

		List<String> result = new ArrayList<>();
		try {
			Class<?> cls = Class.forName("global.testingsystem.controller." + nameController + "Controller");

			/*
			 * returns the array of Method objects representing the public methods of this
			 * class
			 */
			Method m[] = cls.getMethods();
			for (Method method : m) {
				String methodName = method.getName();
				if (!methodOfObject.contains(methodName)) {
					result.add(methodName);
				}
			}
			return result;
		} catch (Exception e) {
			System.out.println("Exception: " + e);
			return null;
		}
	}
}
