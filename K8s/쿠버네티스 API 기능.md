# 쿠버네티스 API 기능

쿠버네티스 API에 대한 기능을 소개한다. 

You can use the K8s API to read and write K8s resource objects via a K8s API endpoint.



## Job v1 batch

```yaml
# Ex : Job Config to print "pi" up to 2000 digits (then exit)
apiversion: batch/v1
kind: Job
metadata:
	# Unique key of the Job instance
	name: example-job
spec:
	template:
		metadata:
			name: example-job
		spec:
			containers:
			- name: pi
				image: perl
				command: ["perl"]
				args: ["-Mbignum=bpi","-wle","print bpi(2000)"]
      # Do not restart containers after they exit
      restartPolicy: Never
```

| Field                | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| apiVersion: string   | ApiVersion defines the versioned schema of this representation of an object. |
| kind: string         | Kind is a string value representing the REST resource this object represents. |
| metadata: ObjectMeta | Standard object's metadata.                                  |
| spec: JobSpec        | Specification of the desired behavior of a job.              |
| status: JobStatus    | Current status of a job.                                     |

### JobStatus v1 batch

| Field                    | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| active: integer          | The number of actively running pods.                         |
| completionTime: Time     | **Representations time when the job was completed.** (It's not guaranteed to be set in happens-before order across separate operations. It's represented in RFC3339 form and is in UTC.) |
| conditions: JobCondition | The latest available observations of an object's current state. |
| failed                   | The number of pods which reached phase Failed.               |
| startTime: Time          | Representations time when the job was acknowledged by the job controller. (It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC.) |
| Succeeded: integer       | The number of pods which reached phase Succeeded.            |



### 참조자료

- https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/

  







